SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

`CREATE TABLE contact_form(enquiry_id int PRIMARY KEY AUTO_INCREMENT,enquiry_name varchar(100),enquiry_email varchar(100),enquiry_mobile varchar(15),enquiry_date DATE)`

ALTER TABLE `contact_form`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `contact_form`
    MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;