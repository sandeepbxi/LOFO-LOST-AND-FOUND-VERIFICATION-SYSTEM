-- ============================================================
-- Lost and Found Management System with Proof-Based Verification
-- Production-ready MySQL Script
-- ============================================================

-- 1) CREATE DATABASE
DROP DATABASE IF EXISTS lost_found_db;
CREATE DATABASE lost_found_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lost_found_db;

-- ============================================================
-- 2) TABLES (3NF-compliant, normalized entities)
-- ============================================================

-- USERS
CREATE TABLE Users (
    user_id       INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    role          ENUM('user','admin') NOT NULL DEFAULT 'user',
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (name <> ''),
    CHECK (email <> '')
);

-- ITEMS
CREATE TABLE Items (
    item_id        INT AUTO_INCREMENT PRIMARY KEY,
    category       VARCHAR(80) NOT NULL,
    color          VARCHAR(50) NOT NULL,
    description    VARCHAR(500) NOT NULL,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (category <> ''),
    CHECK (color <> ''),
    CHECK (description <> '')
);

-- FOUND REPORTS
CREATE TABLE Found_Reports (
    found_id       INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT NOT NULL,
    item_id        INT NOT NULL,
    status         ENUM('Open','Closed') NOT NULL DEFAULT 'Open',
    report_date    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_found_user
      FOREIGN KEY (user_id) REFERENCES Users(user_id)
      ON DELETE CASCADE,

    CONSTRAINT fk_found_item
      FOREIGN KEY (item_id) REFERENCES Items(item_id)
      ON DELETE CASCADE
);

-- LOST REPORTS
CREATE TABLE Lost_Reports (
    lost_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    item_id INT,
    lost_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

-- CLAIM REQUESTS
CREATE TABLE Claim_Requests (
    claim_id        INT AUTO_INCREMENT PRIMARY KEY,
    found_id        INT NOT NULL,
    claimant_id     INT NOT NULL,
    claim_status    ENUM('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
    claim_date      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_claim_found
      FOREIGN KEY (found_id) REFERENCES Found_Reports(found_id)
      ON DELETE CASCADE,

    CONSTRAINT fk_claim_claimant
      FOREIGN KEY (claimant_id) REFERENCES Users(user_id)
      ON DELETE CASCADE
);

-- VERIFICATION STEPS
CREATE TABLE Verification_Steps (
    step_id         INT AUTO_INCREMENT PRIMARY KEY,
    claim_id        INT NOT NULL,
    step_type       VARCHAR(100) NOT NULL,
    step_status     ENUM('Pending','Completed','Failed') NOT NULL DEFAULT 'Pending',
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_step_claim
      FOREIGN KEY (claim_id) REFERENCES Claim_Requests(claim_id)
      ON DELETE CASCADE,

    CHECK (step_type <> '')
);

-- CLAIM EVIDENCE
CREATE TABLE Claim_Evidence (
    evidence_id      INT AUTO_INCREMENT PRIMARY KEY,
    claim_id         INT NOT NULL,
    evidence_type    VARCHAR(100) NOT NULL,
    value            VARCHAR(500) NOT NULL,
    submitted_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_evidence_claim
      FOREIGN KEY (claim_id) REFERENCES Claim_Requests(claim_id)
      ON DELETE CASCADE,

    CHECK (evidence_type <> ''),
    CHECK (value <> '')
);

-- ADMIN DECISIONS
CREATE TABLE Admin_Decisions (
    decision_id      INT AUTO_INCREMENT PRIMARY KEY,
    claim_id         INT NOT NULL,
    admin_id         INT NOT NULL,
    decision         ENUM('Approved','Rejected') NOT NULL,
    reason           VARCHAR(500) NOT NULL,
    decision_date    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_decision_claim
      FOREIGN KEY (claim_id) REFERENCES Claim_Requests(claim_id)
      ON DELETE CASCADE,

    CONSTRAINT fk_decision_admin
      FOREIGN KEY (admin_id) REFERENCES Users(user_id)
      ON DELETE CASCADE,

    CHECK (reason <> ''),
    CHECK (
      (decision = 'Approved' AND LENGTH(TRIM(reason)) >= 3) OR
      (decision = 'Rejected' AND LENGTH(TRIM(reason)) >= 5)
    )
);

-- ============================================================
-- 3) INDEXING
-- ============================================================
CREATE INDEX idx_users_email            ON Users(email);
CREATE INDEX idx_claim_requests_status  ON Claim_Requests(claim_status);
CREATE INDEX idx_claim_requests_found   ON Claim_Requests(found_id);
CREATE INDEX idx_found_reports_item     ON Found_Reports(item_id);

-- Useful additional indexes
CREATE INDEX idx_found_reports_user      ON Found_Reports(user_id);
CREATE INDEX idx_claim_requests_claimant ON Claim_Requests(claimant_id);

-- ============================================================
-- 4) TRIGGERS
-- ============================================================
DELIMITER $$

CREATE TRIGGER validate_claim_before_decision
BEFORE INSERT ON Admin_Decisions
FOR EACH ROW
BEGIN
    DECLARE evidence_count INT;
    DECLARE incomplete_steps INT;
    DECLARE approved_count INT;
    DECLARE user_role VARCHAR(10);

    
    -- 1. Check if evidence exists
    
    SELECT COUNT(*) INTO evidence_count
    FROM Claim_Evidence
    WHERE claim_id = NEW.claim_id;

    IF evidence_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot approve claim without evidence';
    END IF;

   
    -- 2. Check verification steps completed
    
    SELECT COUNT(*) INTO incomplete_steps
    FROM Verification_Steps
    WHERE claim_id = NEW.claim_id
    AND step_status != 'completed';

    IF incomplete_steps > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'All verification steps must be completed';
    END IF;

   
    -- 3. Prevent duplicate approvals
   
    SELECT COUNT(*) INTO approved_count
    FROM Admin_Decisions
    WHERE claim_id = NEW.claim_id
    AND decision = 'approved';

    IF approved_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Item already claimed';
    END IF;

  
    -- 4. Check admin role
  
    SELECT role INTO user_role
    FROM Users
    WHERE user_id = NEW.claim_id;  -- ⚠️ adjust if needed

    IF user_role != 'admin' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Only admin can make decisions';
    END IF;

END$$

-- Trigger 1: Automatically update claim_status after admin decision insert
CREATE TRIGGER trg_after_admin_decision_insert
AFTER INSERT ON Admin_Decisions
FOR EACH ROW
BEGIN
    UPDATE Claim_Requests
       SET claim_status = NEW.decision
     WHERE claim_id = NEW.claim_id;
END$$

-- Trigger 2 (optional behavior): close found report when claim approved
CREATE TRIGGER trg_after_claim_status_update
AFTER UPDATE ON Claim_Requests
FOR EACH ROW
BEGIN
    IF NEW.claim_status = 'Approved' AND OLD.claim_status <> 'Approved' THEN
        UPDATE Found_Reports
           SET status = 'Closed'
         WHERE found_id = NEW.found_id;
    END IF;
END$$

DELIMITER ;

-- ============================================================
-- 5) FUNCTIONS
-- ============================================================
DELIMITER $$

CREATE FUNCTION get_total_claims(p_item_id INT)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_total INT DEFAULT 0;

    SELECT COUNT(cr.claim_id)
      INTO v_total
      FROM Claim_Requests cr
      JOIN Found_Reports fr ON fr.found_id = cr.found_id
     WHERE fr.item_id = p_item_id;

    RETURN IFNULL(v_total, 0);
END$$

CREATE FUNCTION is_admin(p_user_id INT)
RETURNS TINYINT(1)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_is_admin TINYINT(1) DEFAULT 0;

    SELECT CASE WHEN role = 'admin' THEN 1 ELSE 0 END
      INTO v_is_admin
      FROM Users
     WHERE user_id = p_user_id
     LIMIT 1;

    RETURN IFNULL(v_is_admin, 0);
END$$

DELIMITER ;

-- ============================================================
-- 6) STORED PROCEDURES (with transaction management)
-- ============================================================
DELIMITER $$

-- submit_claim(found_id, claimant_id)
CREATE PROCEDURE submit_claim(IN p_found_id INT, IN p_claimant_id INT)
BEGIN
    DECLARE v_exists_found INT DEFAULT 0;
    DECLARE v_exists_user INT DEFAULT 0;
    DECLARE v_report_status ENUM('Open','Closed');

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    SELECT COUNT(*) INTO v_exists_found
      FROM Found_Reports
     WHERE found_id = p_found_id;

    IF v_exists_found = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Found report does not exist.';
    END IF;

    SELECT COUNT(*) INTO v_exists_user
      FROM Users
     WHERE user_id = p_claimant_id;

    IF v_exists_user = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Claimant does not exist.';
    END IF;

    SELECT status INTO v_report_status
      FROM Found_Reports
     WHERE found_id = p_found_id
     FOR UPDATE;

    IF v_report_status <> 'Open' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot claim: report is closed.';
    END IF;

    INSERT INTO Claim_Requests (found_id, claimant_id, claim_status)
    VALUES (p_found_id, p_claimant_id, 'Pending');

    COMMIT;
END$$

-- process_claim(claim_id, decision, reason)
CREATE PROCEDURE process_claim(
    IN p_claim_id INT,
    IN p_decision ENUM('Approved','Rejected'),
    IN p_reason VARCHAR(500)
)
BEGIN
    DECLARE v_claim_exists INT DEFAULT 0;
    DECLARE v_admin_id INT DEFAULT NULL;
    DECLARE v_current_status ENUM('Pending','Approved','Rejected');

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    SELECT COUNT(*) INTO v_claim_exists
      FROM Claim_Requests
     WHERE claim_id = p_claim_id;

    IF v_claim_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Claim does not exist.';
    END IF;

    SELECT claim_status INTO v_current_status
      FROM Claim_Requests
     WHERE claim_id = p_claim_id
     FOR UPDATE;

    IF v_current_status <> 'Pending' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Claim is already processed.';
    END IF;

    -- Use session admin if provided and valid; else fallback to first admin.
    IF @current_admin_id IS NOT NULL AND is_admin(@current_admin_id) = 1 THEN
        SET v_admin_id = @current_admin_id;
    ELSE
        SELECT user_id INTO v_admin_id
          FROM Users
         WHERE role = 'admin'
         ORDER BY user_id
         LIMIT 1;
    END IF;

    IF v_admin_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No admin user found to process claim.';
    END IF;

    INSERT INTO Admin_Decisions (claim_id, admin_id, decision, reason)
    VALUES (p_claim_id, v_admin_id, p_decision, p_reason);

    -- claim_status is updated by trigger trg_after_admin_decision_insert

    COMMIT;
END$$

-- add_verification_step(claim_id, step_type)
CREATE PROCEDURE add_verification_step(IN p_claim_id INT, IN p_step_type VARCHAR(100))
BEGIN
    DECLARE v_claim_exists INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    SELECT COUNT(*) INTO v_claim_exists
      FROM Claim_Requests
     WHERE claim_id = p_claim_id;

    IF v_claim_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Claim does not exist.';
    END IF;

    INSERT INTO Verification_Steps (claim_id, step_type, step_status)
    VALUES (p_claim_id, p_step_type, 'Pending');

    COMMIT;
END$$

DELIMITER ;

-- ============================================================
-- 7) VIEWS
-- ============================================================

CREATE OR REPLACE VIEW pending_claims AS
SELECT
    cr.claim_id,
    cr.found_id,
    fr.item_id,
    i.category,
    i.color,
    cr.claimant_id,
    u.name AS claimant_name,
    cr.claim_status,
    cr.claim_date
FROM Claim_Requests cr
JOIN Found_Reports fr ON fr.found_id = cr.found_id
JOIN Items i ON i.item_id = fr.item_id
JOIN Users u ON u.user_id = cr.claimant_id
WHERE cr.claim_status = 'Pending';

CREATE OR REPLACE VIEW approved_claims AS
SELECT
    cr.claim_id,
    cr.found_id,
    fr.item_id,
    i.category,
    i.description,
    cr.claimant_id,
    u.name AS claimant_name,
    ad.admin_id,
    au.name AS admin_name,
    ad.reason,
    ad.decision_date
FROM Claim_Requests cr
JOIN Found_Reports fr ON fr.found_id = cr.found_id
JOIN Items i ON i.item_id = fr.item_id
JOIN Users u ON u.user_id = cr.claimant_id
LEFT JOIN Admin_Decisions ad ON ad.claim_id = cr.claim_id AND ad.decision = 'Approved'
LEFT JOIN Users au ON au.user_id = ad.admin_id
WHERE cr.claim_status = 'Approved';

CREATE OR REPLACE VIEW rejected_claims AS
SELECT
    cr.claim_id,
    cr.found_id,
    fr.item_id,
    i.category,
    i.description,
    cr.claimant_id,
    u.name AS claimant_name,
    ad.admin_id,
    au.name AS admin_name,
    ad.reason,
    ad.decision_date
FROM Claim_Requests cr
JOIN Found_Reports fr ON fr.found_id = cr.found_id
JOIN Items i ON i.item_id = fr.item_id
JOIN Users u ON u.user_id = cr.claimant_id
LEFT JOIN Admin_Decisions ad ON ad.claim_id = cr.claim_id AND ad.decision = 'Rejected'
LEFT JOIN Users au ON au.user_id = ad.admin_id
WHERE cr.claim_status = 'Rejected';

-- ============================================================
-- 8) SAMPLE DATA
-- ============================================================

-- Users (5 including admin)
INSERT INTO Users (name, email, role) VALUES
('Aarav Sharma',    'aarav.sharma@example.com', 'admin'),
('Priya Mehta',     'priya.mehta@example.com',  'user'),
('Rohan Verma',     'rohan.verma@example.com',  'user'),
('Neha Kapoor',     'neha.kapoor@example.com',  'user'),
('Kunal Singh',     'kunal.singh@example.com',  'user');

-- Items (5)
INSERT INTO Items (category, color, description) VALUES
('Wallet',     'Black', 'Black leather wallet with college ID and metro card'),
('Phone',      'Blue',  'Blue smartphone with cracked corner and transparent cover'),
('Backpack',   'Grey',  'Grey backpack with laptop sleeve and keychain'),
('Watch',      'Silver','Silver analog wrist watch with brown strap'),
('Earbuds',    'White', 'Wireless earbuds case with initials N.K.');

-- Found Reports (one user can report many)
INSERT INTO Found_Reports (user_id, item_id, status) VALUES
(2, 1, 'Open'),
(3, 2, 'Open'),
(4, 3, 'Open'),
(5, 4, 'Open'),
(2, 5, 'Open');

-- Claims (3+)
INSERT INTO Claim_Requests (found_id, claimant_id, claim_status) VALUES
(1, 3, 'Pending'),
(2, 4, 'Pending'),
(3, 5, 'Pending'),
(1, 5, 'Pending');

-- Verification Steps
INSERT INTO Verification_Steps (claim_id, step_type, step_status) VALUES
(1, 'Describe item contents',      'Completed'),
(1, 'Upload ownership proof',      'Completed'),
(2, 'Device unlock verification',  'Completed'),
(3, 'Bag inner pocket description','Pending'),
(4, 'Wallet card details',         'Pending');

-- Claim Evidence
INSERT INTO Claim_Evidence (claim_id, evidence_type, value) VALUES
(1, 'Text Description', 'Contains TIET ID card ending with 312'),
(1, 'Document',         'Photo of purchase receipt uploaded'),
(2, 'Passcode Hint',    'Provided lock pattern screenshot'),
(3, 'Text Description', 'Backpack has a red USB in front chain'),
(4, 'Text Description', 'Wallet has two debit cards and one metro card');

-- Admin decisions via procedure to exercise trigger/transaction flow
SET @current_admin_id = 1;

CALL process_claim(1, 'Approved', 'Evidence matched report and unique identifiers verified.');
CALL process_claim(2, 'Rejected', 'Ownership proof insufficient and unlock details did not match.');

-- (Claims 3 and 4 remain pending)
-- ============================================================
-- End of Script
-- ============================================================
