INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('123 Maple St','London','On', 'N1N-1N1','(555)555-5555','Trusted','ABC Supply Co.','abc@supply.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('543 Sycamore Ave','Toronto','On', 'N1P-1N1','(999)555-5555','Trusted','Big Bills Depot','bb@depot.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak St','London','On', 'N1N-1N1','(555)555-5599','Untrusted','Shady Sams','ss@underthetable.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('354508 Mill Line', 'Ingersoll', 'ON', 'N5C 3J5', '(519) 702-9192', 'Trusted', 'Duncan Deals', 'dwade@ddeals.com');
INSERT INTO Product (Id, VendorId, Name, CostPrice, MSRP, ROP, EOQ, QOH, QOO, QRCode, QRCodeTXT) VALUES ('A113', 1, 'My First ABCs', 10.50, 15.00, 5, 100, 200, 50, NULL, NULL);
INSERT INTO Product (Id, VendorId, Name, CostPrice, MSRP, ROP, EOQ, QOH, QOO, QRCode, QRCodeTXT) VALUES ('A123', 2, 'Prairie Dog Vaccum', 20000.00, 250000.00, 1, 6, 12, 3, NULL, NULL);
INSERT INTO Product (Id, VendorId, Name, CostPrice, MSRP, ROP, EOQ, QOH, QOO, QRCode, QRCodeTXT) VALUES ('B420', 3, '1000 Robux', 5.75, 10.00, 200, 400, 800, 200, NULL, NULL);

-- reference for product
-- create table product (
--         costprice numeric(38,2),
--         eoq integer not null,
--         msrp numeric(38,2),
--         qoh integer not null,
--         qoo integer not null,
--         rop integer not null,
--         vendorid integer not null,
--         id varchar(255) not null,
--         name varchar(255),
--         qrcode varbinary(255),
--         qrcodetxt varchar(255),
--         primary key (id)
--     )