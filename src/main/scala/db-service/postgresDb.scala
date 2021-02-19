package mo.example

import zio.ZLayer
import mo.example.database.Database
import mo.example.dbTransactor.DbTransactor
import mo.example.PersonPersistanceService
import zio.Task
import mo.example.{Person, Hobby}
import zio.console.Console

object PostgressDB {
    
  val db: ZLayer[DbTransactor, Throwable, Database] = ZLayer.fromService {
    transactor =>
      new Database.Service {
        override def getPeople(): Task[List[Person]] =
           PersonPersistanceService(transactor.xa).getPeople()
           
       override def addFakePerson(): Task[Unit]  = 
          PersonPersistanceService(transactor.xa).addFakeUser()
        
       override def createUserTable: Task[Unit] = 
        PersonPersistanceService(transactor.xa).createUserTable

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
