const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it('Comprueba que la ruta GET /cafes devuelve un status code 200 y el tipo de dato sea un objeto.', async () => {
        const { statusCode: status, body: cafes } = await request(server)
            .get('/cafes')
            .send()
        expect(status).toBe(200)
        expect(cafes).toBeInstanceOf(Object)
    })

    it('Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.', async () => {
        const jwt = 'token'
        const id = 32
        const { statusCode: status } = await request(server)
            .delete(`/cafes/${id}`)
            .set('Authorization', jwt)
            .send()
        expect(status).toBe(404)
    })

    it('Comprueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201', async () => {
        const id = Math.floor(Math.random() * 999)
        const cafe = { id, nombre: 'Nuevo cafe' }
        const { statusCode: status } = await request(server)
            .post("/cafes")
            .send(cafe)
        expect(status).toBe(201)
    })

    it('Comprueba que la ruta PUT /cafes devuelve un status code 400 si se intenta actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload', async () => {
        const id = 84
        const cafe = { id: 74, nombre: 'Irlandés' }
        const { statusCode: status } = await request(server)
            .put(`/cafes/${id}`)
            .send(cafe)
        expect(status).toBe(400)
    })
})
