import {getMockProductItems$} from "./mock-data";

describe('[myFunction]', () => {
    it('should not crash', async () => {
        await getMockProductItems$();
    });
});