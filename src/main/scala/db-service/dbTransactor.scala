package mo.example

import zio.Has
import doobie.util.transactor.Transactor
import zio.Task
import mo.example.configuration.DbConfig
import scala.concurrent.ExecutionContext
import zio.ZManaged
import zio.{ZLayer, URLayer}
import zio.ZIO
import zio.blocking.Blocking
import zio.interop.catz._

package object dbTransactor {
  type DbTransactor = Has[ DbTransactor.Service]

  object DbTransactor {
    trait Service {
      //def mkTransactor(): ZManaged[Nothing,Nothing, Transactor[Task]]
      val xa: Transactor[Task]
    }

    val live: URLayer[Has[DbConfig], DbTransactor] =
      ZLayer.fromService { db =>
        new Service {
          val xa: Transactor[Task] =
            Transactor.fromDriverManager(
              db.driver,
              db.url,
              db.user,
              db.password
            )
        }
      }
  }
//   val transactorLive: ZLayer[Has[DbConfig] with Blocking, Throwable, DBTransactor] =
//     ZLayer.fromManaged(for {
//       config     <- configuration.dbConfig.toManaged_
//       connectEC  <- ZIO.descriptor.map(_.executor.asEC).toManaged_
//       blockingEC <- blocking.blocking { ZIO.descriptor.map(_.executor.asEC) }.toManaged_
//       transactor <- mkTransactor(config, connectEC, blockingEC)
//     } yield transactor)

//   val live: ZLayer[DBTransactor, Throwable, UserPersistence] =
//     ZLayer.fromService(new UserPersistenceService(_))
}
