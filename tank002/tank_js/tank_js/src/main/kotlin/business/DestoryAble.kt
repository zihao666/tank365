package business

import model.View


/**
 * ClassName:DestoryAble
 * Description:被销毁的能力
 */
interface DestoryAble:View {
    /**
     * 判断该元素是否需要销毁
     */
    fun needDestory():Boolean

    /**
     * 显示销毁震撼的画面
     */
    fun showDestory():Array<View>?{
        return null
    }
}