var ioc = {
    dataSource: {
        type: "com.alibaba.druid.pool.DruidDataSource",
        events: {
            create: "init",
            depose: 'close'
        },
        fields: {
            url: "jdbc:mysql://127.0.0.1:3306/mql5?useUnicode=true&characterEncoding=utf-8",
            username: "root",
            password: "",
            testWhileIdle: true,
            validationQuery: "select 1",
            maxActive: 5
        }
    },
    dao: {
        type: "org.nutz.dao.impl.NutDao",
        args: [{
            refer: 'dataSource'
        }]
    }
};