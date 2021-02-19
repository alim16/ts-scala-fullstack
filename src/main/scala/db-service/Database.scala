package mo.example

import mo.example.PostgressDB
import mo.example.{Person, Hobby}
import zio.{ZIO, Task, Has, ZLayer}
import zio.console.Console
//import doobie.util.transactor.Transactor
import mo.example.dbTransactor.DbTransactor
//import mo.example.Postgres.DbTransactor


//TODO: modify to add connector or transactor dependency
package object database {
  type Database = Has[Database.Service]

  object Database {
    trait Service {
      def getPeople(): Task[List[Person]]
      def addFakePerson(): Task[Unit]
      def createUserTable: Task[Unit]
     // def getHobbies(): Task[List[Hobby]]
    }

    val live : ZLayer[DbTransactor,Nothing,Database]  = PostgressDB.db.orDie

    val mockDB: ZLayer[DbTransactor, Nothing, Database] = MockDB.fakeDb.orDie //TODO:  orDie?, find out the right way to do this
  }

 // type DBTransactor    = Has[Transactor[Task]]
  def getPeople(): ZIO[Database with Console, Throwable, List[Person]] =
    ZIO.accessM( _.get.getPeople())

  def addFakePerson(): ZIO[Database with Console, Throwable, Unit] =
    ZIO.accessM( _.get.addFakePerson())

  def createUserTable: ZIO[Database with Console, Throwable, Unit] =
    ZIO.accessM( _.get.createUserTable)
  // def getHobbies(): ZIO[Database with Console, Throwable, List[Hobby]] =
  //   ZIO.accessM(_.get.getHobbies())
}
