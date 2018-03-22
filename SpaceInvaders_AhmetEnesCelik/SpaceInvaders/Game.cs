using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceInvaders
{
    class Game
    {
        // Properties
        private bool bGameOver;
        public Board bBoard;

        // Create Menu
        public void vShowMenu()
        {
            Console.SetCursorPosition(6, 10);
            Console.Write("                               _                     _");
            Console.SetCursorPosition(6, 11);
            Console.Write("                              (_)                   | |");
            Console.SetCursorPosition(6, 12);
            Console.Write("    ___ _ __   __ _  ___ ___   _ _ ____   ____ _  __| | ___ _ __ ___ ");
            Console.SetCursorPosition(6, 13);
            Console.Write("   / __| '_ \\ / _` |/ __/ _ \\ | | '_ \\ \\ / / _` |/ _` |/ _ \\ '__/ __|");
            Console.SetCursorPosition(6, 14);
            Console.Write("   \\__ \\ |_) | (_| | (_|  __/ | | | | \\ V / (_| | (_| |  __/ |  \\__ \\ ");
            Console.SetCursorPosition(6, 15);
            Console.Write("   |___/ .__/ \\__,_|\\___\\___| |_|_| |_|\\_/ \\__,_|\\__,_|\\___|_|  |___/ ");
            Console.SetCursorPosition(6, 16);
            Console.Write("        | |                                                           ");
            Console.SetCursorPosition(6, 17);
            Console.Write("        | |                                                           ");


            // Prompts the user to start the game
            Console.SetCursorPosition(27, 22);
            Console.Write("Press Enter To Start Game");

            ConsoleKeyInfo keyPressed;
            bool pressedEnter = false;

            do
            {
                keyPressed = Console.ReadKey(true);
                if (keyPressed.Key == ConsoleKey.Enter)
                {
                    pressedEnter = true;
                }
            } while (!pressedEnter);
        }

        // Initializes every element in the game
        private void vStartNewGame()
        {
            bBoard = new Board();
            bGameOver = false;
        }

        // Starts the game and keeps it running
        public void vRun()
        {
            // Initial values for new game
            vStartNewGame();
            //Keeps the Game Running
            while (!bGameOver)
            {
                bBoard.vDraw();
                // Sends the player to the game over screen
                if (bBoard.bIsGameOver())
                {
                    bBoard = null; // Finishes the simulation
                    bGameOver = true;
                }
            }
            // Shows game over screen
            bShowGameOverMenu();
        } 

        // show game Over Screen and let the player decide if he wants to try again
        public void bShowGameOverMenu()
        {
            // Displays the Game Over Title
            Console.Clear();
            Console.SetCursorPosition(10, 10);
            Console.Write(" _____                        _____                _ _ ");
            Console.SetCursorPosition(10, 11);
            Console.Write("|  __ \\                      |  _  |              | | |");
            Console.SetCursorPosition(10, 12);
            Console.Write("| |  \\/ __ _ _ __ ___   ___  | | | |_   _____ _ __| | |");
            Console.SetCursorPosition(10, 13);
            Console.Write("| | __ / _` | '_ ` _ \\ / _ \\ | | | \\ \\ / / _ \\ '__| | |");
            Console.SetCursorPosition(10, 14);
            Console.Write("| |_\\ \\ (_| | | | | | |  __/ \\ \\_/ /\\ V /  __/ |  |_|_|");
            Console.SetCursorPosition(10, 15);
            Console.Write(" \\____/\\__,_|_| |_| |_|\\___|  \\___/  \\_/ \\___|_|  (_|_)");

            Console.SetCursorPosition(20, 20);
            Console.WriteLine("Do you wanna restart the game? Y/N ");
            
            // Asks the player if he wants to continue playing
            bool pressedCorrectKey = false;
            ConsoleKeyInfo keyPressed;            
            do
            {
                keyPressed = Console.ReadKey(true);
                // Restarts the game
                if (keyPressed.Key == ConsoleKey.Y)
                {
                    pressedCorrectKey = true;
                    vRun();
                }
                // Exits the application
               else if (keyPressed.Key == ConsoleKey.N)
               {
                    pressedCorrectKey = true;
                    bGameOver = true;
               }
            } while (!pressedCorrectKey);
        }

    }
}

