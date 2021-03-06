package mo.example

import zio.ZLayer
import mo.example.database.Database
import zio.Task
import mo.example.{Person, Hobby}
import zio.console.Console
import mo.example.dbTransactor.DbTransactor

object MockDB {
  val fakeDb: ZLayer[DbTransactor, Throwable, Database] = ZLayer.fromService {
    transactor =>
      new Database.Service {
        override def getPeople(): Task[List[Person]] =
            Task {
              List(
                Person(1,"name1", "name1@gmail.com", "/img1"),
                Person(2,"name2", "name2@gmail.com", "/img2"),
                Person(3,"name3", "name3@gmail.com", "/img3")
              )
            }
        
           override def addFakePerson(): Task[Unit] = Task.succeed(())

           override def createUserTable: Task[Unit] = Task.succeed(())
        // override def getHobbies(): Task[List[Hobby]] =
        //   console.putStrLn("getting hobbies list") *>
        //     Task {
        //       List(
        //         Hobby("hobby1", "/img1"),
        //         Hobby("hobby2", "/img2"),
        //         Hobby("hobby3", "/img3")
        //       )
        //     }
      }
  }
}
