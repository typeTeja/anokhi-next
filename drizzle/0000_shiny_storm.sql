CREATE TABLE `contact_leads` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`inquiry_type` varchar(100),
	`message` varchar(1000),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `contact_leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`property_id` int,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`city` varchar(100) NOT NULL,
	`area` varchar(100),
	`type` varchar(50),
	`image` varchar(255),
	`is_featured` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property_highlights` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`property_id` int,
	`label` varchar(255) NOT NULL,
	`value` varchar(255) NOT NULL,
	CONSTRAINT `property_highlights_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `leads` ADD CONSTRAINT `leads_property_id_properties_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `property_highlights` ADD CONSTRAINT `property_highlights_property_id_properties_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE no action ON UPDATE no action;