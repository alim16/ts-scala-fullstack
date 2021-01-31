// Monix Minitest:
//libraryDependencies += "io.monix" %% "minitest" % "2.8.2" % "test"
//testFrameworks += new TestFramework("minitest.runner.Framework")

// Hedgehog:
val hedgehogVersion = "0.4.2"
val zioVersion      = "1.0.2"
val http4sVersion   = "1.0.0-M4"
val circeVersion    = "0.12.3"

lazy val rootProject = project
  .in(file("."))
  .settings(
    scalaVersion := "2.13.3",
    libraryDependencies ++= Seq(
      // "qa.hedgehog" %% "hedgehog-core" % hedgehogVersion,
      // "qa.hedgehog" %% "hedgehog-runner" % hedgehogVersion,
      // "qa.hedgehog" %% "hedgehog-minitest" % hedgehogVersion,
      "dev.zio"    %% "zio"                 % zioVersion,
      "dev.zio"    %% "zio-test"            % zioVersion,
      "dev.zio"    %% "zio-test-sbt"        % zioVersion,
      "org.http4s" %% "http4s-blaze-server" % http4sVersion,
      "org.http4s" %% "http4s-dsl"          % http4sVersion,
      "dev.zio"    %% "zio-interop-cats"    % "2.2.0.1", //TODO: change to variable
      "io.circe" %% "circe-generic"         % circeVersion,
      "org.http4s" %% "http4s-circe"        % http4sVersion,
    )
  )
 
// scalacOptions ++= Seq(
//   "-deprecation",
//   "-encoding",
//   "UTF-8",
//   "-language:higherKinds",
//   "-language:postfixOps",
//   "-feature",
//   "-Xfatal-warnings"
// )
