module.exports = {
    requiresSetup: true,
    mysql: {
        database: "fossticket",
        username: "root",
        password: "",
        host: "localhost"
    },
    server: {
        port: 8080 // 8080 is default for FOSSTicket, 80/443 is for production
    }
}