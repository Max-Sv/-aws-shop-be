CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text,
    price integer
)

create table stocks (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id uuid,
    count integer,
    foreign key ("product_id") references "products" ("id")
)

insert into products (title, description, price) values
("Xbox Series X", "Xbox head Phil Spencer stated that Microsoft was prioritizing high frame rates and faster load times over higher resolutions; the Series X achieves this via the better-matched capabilities of the CPU and GPU. The Xbox Series X is powered by a custom 7 nm AMD Zen 2 CPU with eight cores running at a nominal 3.8 GHz or, when simultaneous multithreading (SMT) is used, at 3.6 GHz. One CPU core is dedicated to the underlying operating system.", 899),
("Xbox series S", "The Xbox Series S is comparable in its hardware to the Xbox Series X, similar to how the Xbox One S relates to the Xbox One X, but has less processing power. While it runs the same CPU with slightly slower clock frequencies, it uses a slower GPU, a custom RDNA2 with 20 CUs at 1.55 GHz for 4 TFLOPS, compared to 12 TFLOPS of the Series X. ", 350),
("Sony PlayStation 5", "The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment. Announced in 2019 as the successor to the PlayStation 4, the PS5 was released on November 12, 2020, in Australia, Japan, New Zealand, North America, and South Korea, with worldwide release following a week later. The PS5 is part of the ninth generation of video game consoles, along with Microsoft's Xbox Series X and Series S consoles, which were released in the same month.", 999),
("Sony PlayStation 4 pro", "The PlayStation 4 Pro (codenamed Neo, model number CUH-7000) was announced on September 7, 2016, and launched worldwide on November 10, 2016. It is an upgraded version of the PlayStation 4 with improved hardware to enable 4K rendering and improved PlayStation VR performance, including an upgraded GPU with 4.198 teraflops of processing power and hardware support for checkerboard rendering, and a higher CPU clock", 450),
("Nintendo Switch", "The Nintendo Switch is a video game console developed by Nintendo and released worldwide in most regions on March 3, 2017. The console itself is a tablet that can either be docked for use as a home console or used as a portable device, making it a hybrid console. Its wireless Joy-Con controllers, with standard buttons and directional analog sticks for user input, motion sensing, and tactile feedback, can attach to both sides of the console to support handheld-style play. They can also connect to a grip accessory to provide a traditional home console gamepad form, or be used individually in the hand like the Wii Remote and Nunchuk, supporting local multiplayer modes.", 449),

insert into stocks (product_id, count) values
('d7965ae3-4480-4932-8db6-5e773e0a8e72', 4),
('d418330d-ef0d-4e86-a515-0daa1cc7d2a0', 4),
('9e1d4ea4-e914-4ade-949c-c3f46e66b81d', 2),
('68592d96-90db-4312-9ecd-c708b3fe372f', 3),
('4f3db0b6-b70a-48ba-aa5a-ee47b52d3a9c', 12)