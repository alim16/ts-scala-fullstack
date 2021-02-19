package mo.example
//from wiem zine http4s_doobie example
//https://github.com/wi101/zio-examples/blob/master/src/main/scala/com/zio/examples/http4s_doobie/configuration/package.scala
import pureconfig.ConfigSource
import zio._

package object configuration {
  type Configuration = Has[ApiConfig] with Has[DbConfig]

  final case class AppConfig(api: ApiConfig, dbConfig: DbConfig)
  final case class ApiConfig(endpoint: String, port: Int)
  final case class DbConfig(driver:String, url: String, user: String, password: String)

  val apiConfig: URIO[Has[ApiConfig], ApiConfig] = ZIO.access(_.get)
  val dbConfig: URIO[Has[DbConfig], DbConfig]    = ZIO.access(_.get)

  object Configuration {
    import pureconfig.generic.auto._
    val live: Layer[Throwable, Configuration] = ZLayer.fromEffectMany(
      Task
        .effect(ConfigSource.default.loadOrThrow[AppConfig])
        .map(c => Has(c.api) ++ Has(c.dbConfig))
    )
  }
}
