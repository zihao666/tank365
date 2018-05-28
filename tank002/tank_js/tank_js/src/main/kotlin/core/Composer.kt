package core

import org.w3c.dom.HTMLAudioElement
import kotlin.browser.document


/**
 * ClassName:Composer
 * Description:作曲家
 */
object Composer {
    fun play(path:String){
//        HTMLAudioElement
        val ele = document.createElement("audio") as HTMLAudioElement
        ele.src = path
        ele.play()
    }
}