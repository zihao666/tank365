
import javafx.scene.input.KeyCode
import javafx.scene.input.KeyEvent
import javafx.scene.paint.Color
import org.itheima.kotlin.game.core.Composer
import org.itheima.kotlin.game.core.Painter
import org.itheima.kotlin.game.core.Window

/**
 * ClassName:GameWindow
 * Description:游戏窗体
 */
class GameWindow:Window() {
    //游戏初始化 只执行一次
    override fun onCreate() {
        println("执行了onCreate")
    }
    //游戏界面绘制  会一直执行(界面会不断进行绘制)
    override fun onDisplay() {
        //绘制一面墙  (坐标 x y 图片 绘制方法)
        Painter.drawImage("img/wall.gif",100,100)
        //绘制文字
        Painter.drawText("坦克大战",200,200, Color.RED)
        //绘制颜色
        Painter.drawColor(Color.YELLOW,300,300,100,100)
    }
    //键盘事件
    override fun onKeyPressed(event: KeyEvent) {
        val code = event.code
        when(code){
            KeyCode.A->{
                println("想左")
            }
            KeyCode.D->{
                println("想右")
            }
            KeyCode.W->{
                println("想前")
            }
            KeyCode.S->{
                println("想后")
            }
            KeyCode.ENTER->{
                //播放爆炸的声音
                Composer.play("snd/blast.wav")
            }
        }
    }
    //界面的刷新 一直执行
    override fun onRefresh() {
        println("执行onRefresh")
    }//继承游戏引擎的Window
}