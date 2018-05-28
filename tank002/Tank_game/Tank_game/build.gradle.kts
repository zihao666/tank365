group = "com.itcast.tank"
version = "1.0-SNAPSHOT"
plugins{
    kotlin("jvm")
}
repositories {
    mavenCentral()
    //添加maven私服地址
    //jcenter  maven私服  本地仓库
    maven {
        setUrl("https://jitpack.io")
    }
}
dependencies {
    compile(kotlin("stdlib"))
    compile("com.github.shaunxiao:kotlinGameEngine:v0.0.4")
}

