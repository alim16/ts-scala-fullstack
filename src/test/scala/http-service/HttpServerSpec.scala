package mo.example

import zio.test._
import zio.test.Assertion._
import zio.ZIO


object ServerSpec extends DefaultRunnableSpec {
    //TODO: provide mockDB
    def spec = suite("server module")(
        testM("startHttp4Server creates a new fiber"){
            assertM(ZIO.succeed(1+1))(equalTo(2)) //TODO: add real test
        },
        testM("/people route returns json of people"){
            assertM(ZIO.succeed(1+1))(equalTo(2)) //TODO: add real test
        }
    )
}
