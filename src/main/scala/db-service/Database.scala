package mo.example

import mo.example.{Person, Hobby}
import zio.{ZIO, Task, Has, ZLayer}

//TODO: modify to add connector or transactor dependency
package object database {
  type Database = Has[Database.Service]

  object Database {
    trait Service {
      def getPeople(): Task[List[Person]]
      def getHobbies(): Task[List[Hobby]]
    }

    //val live : ZLayer[Any,Nothing,Database]  = ??? //TODO: implement this

    val mockDB: ZLayer[Any, Nothing, Database] = MockDB.fakeDb.orDie //TODO:  orDie?, find out the right way to do this
  }

  def getPeople(): ZIO[Database, Throwable, List[Person]] =
    ZIO.accessM(_.get.getPeople())
  def getHobbies(): ZIO[Database, Throwable, List[Hobby]] =
    ZIO.accessM(_.get.getHobbies())
}
