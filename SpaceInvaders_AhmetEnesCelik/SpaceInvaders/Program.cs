using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceInvaders
{
    class Program
    {
        static void Main(string[] args)
        {
            // Window And Buffer Size
            const int iScreenSizeX = 80;
            const int iScreenSizey = 40;

            // Console Window Configuration
            Console.Title = "Space Invaders";
            Console.SetBufferSize(iScreenSizeX, iScreenSizey);
            Console.SetWindowSize(iScreenSizeX, iScreenSizey);
            Console.CursorVisible = false;

            // Creates the only Game instance 
            Game game = new Game();
            //Make this screen appear until the player hits enter
            game.vShowMenu();
            game.vRun();            
        }
    }
}
