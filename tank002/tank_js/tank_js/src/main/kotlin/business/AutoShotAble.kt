package business

import model.Bullet
import model.View


/**
 * ClassName:AutoShotAble
 * Description:自动射击的能力
 */
interface AutoShotAble:View {
    //自动射击的时间间隔
    val interval:Int
    /**
     * 自动射击
     * @return 返回射击的子弹  有可能没有
     */
    fun autoShot():Bullet?
}