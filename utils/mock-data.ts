export interface MockProductItem {
    count: number,
    description: string,
    id: string,
    price: number,
    title: string
}

const mockProductItems =  [
    {
        "count": 4,
        "description": "Xbox head Phil Spencer stated that Microsoft was prioritizing high frame rates and faster load times over higher resolutions; the Series X achieves this via the better-matched capabilities of the CPU and GPU. The Xbox Series X is powered by a custom 7 nm AMD Zen 2 CPU with eight cores running at a nominal 3.8 GHz or, when simultaneous multithreading (SMT) is used, at 3.6 GHz. One CPU core is dedicated to the underlying operating system.",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        "price": 899,
        "title": "Xbox Series X"
    },
    {
        "count": 6,
        "description": "The Xbox Series S is comparable in its hardware to the Xbox Series X, similar to how the Xbox One S relates to the Xbox One X, but has less processing power. While it runs the same CPU with slightly slower clock frequencies, it uses a slower GPU, a custom RDNA2 with 20 CUs at 1.55 GHz for 4 TFLOPS, compared to 12 TFLOPS of the Series X. ",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
        "price": 350,
        "title": "Xbox series S"
    },
    {
        "count": 7,
        "description": "The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment. Announced in 2019 as the successor to the PlayStation 4, the PS5 was released on November 12, 2020, in Australia, Japan, New Zealand, North America, and South Korea, with worldwide release following a week later. The PS5 is part of the ninth generation of video game consoles, along with Microsoft's Xbox Series X and Series S consoles, which were released in the same month.",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        "price": 999,
        "title": "Sony PlayStation 5"
    },
    {
        "count": 12,
        "description": "The PlayStation 4 Pro (codenamed Neo, model number CUH-7000)[38] was announced on September 7, 2016, and launched worldwide on November 10, 2016.[216][217] It is an upgraded version of the PlayStation 4 with improved hardware to enable 4K rendering and improved PlayStation VR performance, including an upgraded GPU with 4.198 teraflops of processing power[218] and hardware support for checkerboard rendering,[219] and a higher CPU clock",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
        "price": 450,
        "title": "Sony PlayStation 4 pro"
    },
    {
        "count": 7,
        "description": "The PlayStation 4 (PS4) is a home video game console developed by Sony Computer Entertainment. Announced as the successor to the PlayStation 3 in February 2013, it was launched on November 15, 2013, in North America, November 29, 2013 in Europe, South America and Australia, and on February 22, 2014 in Japan. A console of the eighth generation, it competes with Microsoft's Xbox One and Nintendo's Wii U and Switch.",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        "price": 300,
        "title": "Sony PlayStation 4"
    },
    {
        "count": 8,
        "description": "The Xbox One is a home video game console developed by Microsoft. Announced in May 2013, it is the successor to Xbox 360 and the third base console in the Xbox series of video game consoles. It was first released in North America, parts of Europe, Australia, and South America in November 2013 and in Japan, China, and other European countries in September 2014.",
        "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
        "price": 300,
        "title": "Xbox One X"
    },
    {
        "count": 2,
        "description": "The Xbox One is a home video game console developed by Microsoft. Announced in May 2013, it is the successor to Xbox 360 and the third base console in the Xbox series of video game consoles. It was first released in North America, parts of Europe, Australia, and South America in November 2013 and in Japan, China, and other European countries in September 2014.",
        "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
        "price": 200,
        "title": "Xbox One S"
    },
    {
        "count": 3,
        "description": "The Nintendo Switch is a video game console developed by Nintendo and released worldwide in most regions on March 3, 2017. The console itself is a tablet that can either be docked for use as a home console or used as a portable device, making it a hybrid console. Its wireless Joy-Con controllers, with standard buttons and directional analog sticks for user input, motion sensing, and tactile feedback, can attach to both sides of the console to support handheld-style play. They can also connect to a grip accessory to provide a traditional home console gamepad form, or be used individually in the hand like the Wii Remote and Nunchuk, supporting local multiplayer modes.",
        "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
        "price": 449,
        "title": "Nintendo Switch"
    }
]

export function getMockProductItems$(): Promise<MockProductItem[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProductItems);
        }, 0);
    });

}
// export function getMockProductItemById$(id: string): Promise<MockProductItem>  | undefined {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const item = mockProductItems.find(item => item.id === id)
//             if (item) {
//                 resolve(mockProductItems.find(item => item.id === id));
//             } else {
//                 reject(undefined)
//             }
//         }, 0);
//     });
//
// }
export function getMockProductItemById$(id: string): Promise<MockProductItem> | Promise<any>  {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const item = mockProductItems.find(item => item.id === id)
            if (item) {
                resolve(mockProductItems.find(item => item.id === id));
            } else {
                reject(new Error("Product not found"))
            }
        }, 0);
    });

}
