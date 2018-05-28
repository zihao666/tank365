import org.gradle.internal.impldep.org.junit.experimental.categories.Categories.CategoryFilter.include
import org.jetbrains.kotlin.contracts.model.structure.UNKNOWN_COMPUTATION.type

buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.2.31")
    }
}

group = "com.itcast.gradle"
version = "1.0-SNAPSHOT"

plugins {
    application
}
apply {
    plugin("kotlin2js")
}

repositories {
    mavenCentral()
}

dependencies {
    compile("org.jetbrains.kotlin:kotlin-stdlib-js:1.2.31")
    compile("org.jetbrains.kotlin:kotlin-test-js:1.2.31")
}

task("assembleWeb",Copy::class){
    configurations.compile.forEach {
        from(zipTree(it.absolutePath)){
            includeEmptyDirs = false
            include {
                val path = it.path
                path.endsWith(".js")&&(path.startsWith("META-INF/resources")||!path.startsWith("WEB-INF"))
            }
        }
        from("${projectDir}/build/classes/kotlin/main")
        into("${projectDir}/src/main/resources")
    }
}.dependsOn("classes")

//task assembleWeb(type: Sync) {
//    configurations.compile.each { File file ->
//        from(zipTree(file.absolutePath), {
//            includeEmptyDirs = false
//            include { fileTreeElement ->
//                def path = fileTreeElement.path
//                        path.endsWith(".js") && (path.startsWith("META-INF/resources/") ||
//                        !path.startsWith("META-INF/"))
//            }
//        })
//    }
//    from compileKotlin2Js.destinationDir
//            into "${projectDir}/web"
//
//    dependsOn classes
//}
//
//assemble.dependsOn assembleWeb