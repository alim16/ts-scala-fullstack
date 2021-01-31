package mo.example.http

import zio._
import zio.interop.catz._
import zio.interop.catz.implicits._

import org.http4s.server._
//import org.http4s.server.blaze._
import org.http4s.server.blaze.BlazeServerBuilder
import mo.example.database.Database
import mo.example.MockDB

//https://github.com/kovacshuni/zio-http4s-zlayer-example
package object server {
  type HttpServer = Has[HttpServer.Service]

  object HttpServer {
    trait Service {
      //TODO:not sure if HttpServer dependency is required
      def startHttpServer(): ZManaged[HttpServer, Nothing, Server]
    }

    private def startHttp4Server(
        DAO: Database.Service
    ): ZManaged[Any, Throwable, Server] =
      ZIO.runtime[Any].toManaged_.flatMap { implicit runtime =>
        BlazeServerBuilder[Task](runtime.platform.executor.asEC)
          .bindHttp(8080, "localhost")
          .withHttpApp(Routes.helloWorldsService(DAO))
          .resource
          .toManagedZIO
      }
    val live: ZLayer[Database, Nothing, HttpServer] =
      ZLayer.fromService { db: Database.Service =>
        new Service {
          override def startHttpServer(): ZManaged[Any, Nothing, Server] =
            startHttp4Server(db).orDie
        }
      }

    def startHttpServer: URIO[HttpServer, Server] =
      ZIO.accessM(_.get.startHttpServer.fork.useForever)
  }
}
