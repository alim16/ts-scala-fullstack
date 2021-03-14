package mo.example
import zio._, zio.console._

import mo.example.http.server.HttpServer
import mo.example.database.Database
import org.http4s.server.Server
import zio.duration._
import zio.clock.Clock
import zio.blocking.Blocking
import mo.example.configuration.Configuration
import mo.example.dbTransactor.DbTransactor

object Main extends zio.App {
  //type AppEnvironment = HttpServer with Console with Database with Clock

  def run(args: List[String]) =
    appLogic.provideLayer(prepareEnvironment).exitCode //.forever

  val appLogic =
    for {
      _           <- putStrLn("starting server on localhost:8080...")
      serverFiber <- HttpServer.startHttpServer
      _           <- putStrLn("server is running on localhost:8080")
      //the next line kills the main fiber after 30s which kills the child server fiber
      //_ <- ZIO.sleep(30.seconds) *> putStrLn("30 seconds over: shutting down server...")
    } yield ()

  private val prepareEnvironment = Clock.live ++ Console.live  ++ ( Configuration.live >>> DbTransactor.live >>> Database.live >>> HttpServer.live)
}