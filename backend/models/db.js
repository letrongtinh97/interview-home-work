const pg = require('pg')

const { types } = pg
const timestampOID = 1114
const timestamptzOID = 1184
const dateOID = 1082
types.setTypeParser(timestampOID, (v) => v)
types.setTypeParser(timestamptzOID, (v) => v)
types.setTypeParser(dateOID, (v) => v)
pg.defaults.ssl = true;
const config = {
    host: 'ec2-174-129-255-35.compute-1.amazonaws.com',
    user: 'pfowbablsjszqn',
    database: 'd95q1u4muk5vjo',
    password: '13b63aac00b4a89f255fd06e74ed7f52260c4ce4282400c2bc84b391f0e73430',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000,
    ssl: true,
};
const postgre = {
    run(query) {
        const pool = new pg.Pool(config)
        let poolClient = null
        let result = null
        let error = null
        return pool
            .connect()
            .then((pc) => (poolClient = pc))
            .then(() => poolClient.query(query))
            .then((rs) => (result = rs))
            .catch((e) => (error = e))
            .then(() => {
                if (poolClient !== null)
                    poolClient.release((err) => {
                        if (err) {
                            // cant not release PoolClient
                        }
                    })
                if (error !== null) {
                    // query fail
                    throw error
                }


                return result
            })
    },
}



module.exports = {
    postgre
}