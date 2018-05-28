package core
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window

/**
 * ClassName:GameWindow
 * Description:游戏窗体
 */
 abstract class Window(val id:String, val width:Int, val height:Int) {
    //刷新频率
    var time = 50
    init {
        val canvas = document.getElementById("canvas") as HTMLCanvasElement
        val ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        ctx.canvas.width = width
        ctx.canvas.height = height

        //设置Painter的CanvasRenderingContext2D
        Painter.initCtx(ctx)
    }

    fun start(){
        //初始化
        onCreate()
        //键盘事件
        window.onkeypress={
            it as KeyboardEvent
            onKeyPressed(it.keyCode)
        }
        window.setInterval({
            onDisplay()
            onRefresh()
        },time)
    }

    /**
     * 初始化 可以加载地图
     */
    abstract fun onCreate()

    /**
     * 绘制界面元素
     */
    abstract fun onDisplay()

    /**
     * 键盘事件
     * @param code 键盘值
     */
    abstract fun onKeyPressed(code:Int)

    /**
     * 页面刷新
     */
    abstract fun onRefresh()
}