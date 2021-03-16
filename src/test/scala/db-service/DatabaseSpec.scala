package mo.example
import zio.test._
import zio.test.Assertion._

import mo.example.configuration.Configuration
import mo.example.dbTransactor.DbTransactor
import mo.example.database.Database

import zio.test.environment.{TestEnvironment}
import zio.ZIO

object DatabaseSpec extends DefaultRunnableSpec {
  val partialLayer = Configuration.live >>> DbTransactor.live >>> Database.mockDB
  override def spec: ZSpec[Environment, Failure] = suite("database module")(
    testM("getPeople returns a list of people") {
      val people = List(Person(1,"name1","name1@gmail.com","/img1"), Person(2,"name2","name2@gmail.com","/img2"), Person(3,"name3","name3@gmail.com","/img3"))
      val testCase =
        for {
          service <- ZIO.service[Database.Service] 
          value   <- service.getPeople()
        } yield assert(people)(equalTo(value))
      testCase.provideSomeLayer(partialLayer)
    }
  )
}
