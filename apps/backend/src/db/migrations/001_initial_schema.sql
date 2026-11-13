-- 1. USERS: people who use VendorTrust
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('ADMIN', 'REVIEWER')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX users_email_lower_idx
ON users (LOWER(email));


-- 2. VENDORS: registered companies
CREATE TABLE vendors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    website VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT'
        CHECK (status IN (
            'DRAFT', 'SUBMITTED', 'UNDER_REVIEW',
            'APPROVED', 'REJECTED'
        )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 3. RISK ASSESSMENTS: vendor risk evaluation
CREATE TABLE risk_assessments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vendor_id BIGINT NOT NULL UNIQUE
        REFERENCES vendors(id) ON DELETE CASCADE,
    security_score INTEGER NOT NULL
        CHECK (security_score BETWEEN 0 AND 100),
    financial_score INTEGER NOT NULL
        CHECK (financial_score BETWEEN 0 AND 100),
    compliance_score INTEGER NOT NULL
        CHECK (compliance_score BETWEEN 0 AND 100),
    comments TEXT,
    assessed_by BIGINT REFERENCES users(id),
    assessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 4. AUDIT LOGS: history of important actions
CREATE TABLE audit_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vendor_id BIGINT NOT NULL
        REFERENCES vendors(id) ON DELETE RESTRICT,
    performed_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(30) NOT NULL
        CHECK (action IN (
            'CREATED', 'SUBMITTED', 'REVIEW_STARTED',
            'APPROVED', 'REJECTED', 'ASSESSMENT_UPDATED'
        )),
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Indexes for common queries
CREATE INDEX vendors_status_idx ON vendors(status);
CREATE INDEX audit_logs_vendor_created_idx
ON audit_logs(vendor_id, created_at DESC);
