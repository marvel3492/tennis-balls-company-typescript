-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- Create tables
CREATE TABLE IF NOT EXISTS customer (
    customer_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT CHECK (customer_id >= 1),
    firstname TEXT NOT NULL CHECK (LENGTH(firstname) >= 1 AND LENGTH(firstname) <= 20),
    lastname TEXT NOT NULL CHECK (LENGTH(lastname) >= 1 AND LENGTH(lastname) <= 20),
    email TEXT NOT NULL CHECK (LENGTH(email) >= 1 AND LENGTH(email) <= 25),
    phone TEXT NOT NULL CHECK (LENGTH(phone) >= 1 AND LENGTH(phone) <= 20),
    address TEXT NOT NULL CHECK (LENGTH(address) >= 1 AND LENGTH(address) <= 50),
    city TEXT NOT NULL CHECK (LENGTH(city) >= 1 AND LENGTH(city) <= 20),
    state TEXT NOT NULL CHECK (LENGTH(state) >= 1 AND LENGTH(state) <= 50),
    zip TEXT NOT NULL CHECK (LENGTH(zip) >= 1 AND LENGTH(zip) <= 10),
    username TEXT NOT NULL UNIQUE CHECK (LENGTH(username) >= 1 AND LENGTH(username) <= 20),
    password TEXT NOT NULL CHECK (LENGTH(password) >= 1 AND LENGTH(password) <= 2000),
    isadmin INTEGER NOT NULL DEFAULT 0 CHECK (isadmin = 0 OR isadmin = 1)  -- An isadmin of 0 means that the customer is not an admin; an isadmin of 1 means that the customer is an admin. If you want to change a customer to an admin, you must use an SQLite management tool to do so. You also need to logout and log back in for the change to take effect.
) STRICT;
CREATE TABLE IF NOT EXISTS image (
    image_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT CHECK (image_id >= 1),
    filename TEXT NOT NULL CHECK (LENGTH(filename) BETWEEN 40 AND 41),  -- Filename extensions (including the ".") must be 4-5 characters in length
    description TEXT NOT NULL DEFAULT '' CHECK (LENGTH(description) <= 500)
) STRICT;
CREATE TABLE IF NOT EXISTS product (
    product_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT CHECK (product_id >= 1),
    image_id INTEGER NULL DEFAULT NULL CHECK (image_id IS NULL OR image_id >= 1),  -- Use the file names found in the public\images folder
    productname TEXT NOT NULL UNIQUE CHECK (LENGTH(productname) >= 1 AND LENGTH(productname) <= 50),
    description TEXT NOT NULL DEFAULT '' CHECK (LENGTH(description) <= 500),
    saleprice REAL NOT NULL DEFAULT 0 CHECK (saleprice >= 0 AND saleprice <= 1e308) CHECK (saleprice = ROUND(saleprice, 2)),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    homepage INTEGER NOT NULL DEFAULT 0 CHECK (homepage = 0 OR homepage = 1),  -- A homepage of 0 will not show on Index.js; a homepage of 1 will show on Index.js.
    FOREIGN KEY (image_id) REFERENCES image(image_id) ON DELETE SET NULL ON UPDATE RESTRICT
) STRICT;
CREATE TABLE IF NOT EXISTS saleorder (
    order_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT CHECK (order_id >= 1),
    customer_id INTEGER NOT NULL CHECK (customer_id >= 1),
    saledate TEXT NOT NULL DEFAULT CURRENT_DATE CHECK (saledate GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    customernotes TEXT NOT NULL DEFAULT '' CHECK (LENGTH(customernotes) <= 500),
    paymentstatus INTEGER NOT NULL DEFAULT 0 CHECK (paymentstatus BETWEEN 0 AND 2), -- A paymentstatus of 0 means that the saleorder is pending; a paymentstatus of 1 means that the saleorder is paid; a paymentstatus of 2 means that the saleorder is rejected.
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE RESTRICT
) STRICT;
CREATE TABLE IF NOT EXISTS orderdetail (
    orderdetail_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT CHECK (orderdetail_id >= 1),
    order_id INTEGER NOT NULL CHECK (order_id >= 1),
    product_id INTEGER NOT NULL CHECK (product_id >= 1),
    saleprice REAL NOT NULL DEFAULT 0 CHECK (saleprice >= 0 AND saleprice <= 1e308) CHECK (saleprice = ROUND(saleprice, 2)),
    qty INTEGER NOT NULL DEFAULT 1 CHECK (qty >= 1),
    FOREIGN KEY (order_id) REFERENCES saleorder(order_id) ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE RESTRICT
) STRICT;
CREATE TABLE IF NOT EXISTS promotion (
    promotion_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT CHECK (promotion_id >= 1),
    image_id INTEGER NULL DEFAULT NULL CHECK (image_id IS NULL OR image_id >= 1),  -- Use the file names found in the public\images folder
    promotitle TEXT NOT NULL UNIQUE CHECK (LENGTH(promotitle) >= 1 AND LENGTH(promotitle) <= 50),
    description TEXT NOT NULL DEFAULT '' CHECK (LENGTH(description) <= 200),
    startdate TEXT NOT NULL CHECK (startdate <= enddate) CHECK (startdate GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    enddate TEXT NOT NULL CHECK (startdate <= enddate) CHECK (enddate GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    discountrate REAL NOT NULL DEFAULT 0 CHECK (discountrate >= 0 AND discountrate <= 1e308),  -- As a percentage (10%, 0.5%, etc.)
    FOREIGN KEY (image_id) REFERENCES image(image_id) ON DELETE SET NULL ON UPDATE RESTRICT
) STRICT;