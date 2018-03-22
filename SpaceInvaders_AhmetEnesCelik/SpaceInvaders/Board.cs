using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Timers;
using System.Threading;

namespace SpaceInvaders
{
    // Directions in which an object can be moved
    enum Direction { Right, Left, Down };

    class Board
    {    
        // Board elements
        private Player pPlayer;
        private Fleet fFleet;
        private List<Bullet> lbBullets = new List<Bullet>();
        private int iLevel;
        // Bullet Timer to update movement of bullets
        private System.Timers.Timer tBulletTimer;
        // Fleet Timer to update movement of Fleet
        private System.Timers.Timer tFleetMovementTimer;
        // Timer to make the Enemy shoot
        private System.Timers.Timer tMakeEnemyShootTimer;

        // Constructor
        public Board()
        {
            pPlayer = new Player();
            fFleet = new Fleet();
            iLevel = 0;
            vStartTimers();
        }

        // Configures and start all timers
        private void vStartTimers()
        {
            // Configures the Bullet Timer
            tBulletTimer = new System.Timers.Timer(50);
            tBulletTimer.Enabled = true; // Makes the elapsed function to be triggered
            tBulletTimer.Elapsed += updateBulletsPosition; // Event  that triggers function

            // Configures the Fleet Movement Timer
            tFleetMovementTimer = new System.Timers.Timer(fFleet.iGetSpeed());
            tFleetMovementTimer.Enabled = true; // Makes the elapsed function to be triggered
            tFleetMovementTimer.Elapsed += vMoveFleet; // Event  that triggers function

            // Configures the Enemy Shooting Timer
            tMakeEnemyShootTimer = new System.Timers.Timer(1000);
            tMakeEnemyShootTimer.Enabled = true; // Makes the elapsed function to be triggered
            tMakeEnemyShootTimer.Elapsed += makeEnemyShoot; // Event  that triggers function
        }

        // Draw every frame to the screen
        public void vDraw()
        {
            // Clears the console
            Console.Clear();

            // Draws the elements on the screen
            vDrawScore();
            vDrawPlayer();
            vDrawFleet();
            vDrawBullets();

            // Checks the users input for movement or shooting
            vCheckPlayerInput();
            // Makes the drawing less constant
            System.Threading.Thread.Sleep(50);
        }

        // Draws the score with the updated information
        private void vDrawScore()
        {
            Console.ForegroundColor = ConsoleColor.White;
            Console.SetCursorPosition(10, 0);
            Console.Write("------------------------------------------------------------");
            Console.SetCursorPosition(10, 1);
            Console.Write("Player Score: " + pPlayer.iGetScore());
            Console.SetCursorPosition(62, 1);
            Console.Write("Lifes: " + pPlayer.iGetLifes());
            Console.SetCursorPosition(10, 2);
            Console.Write("------------------------------------------------------------");
        }

        // Draws the player Position
        private void vDrawPlayer()
        {
            Console.SetCursorPosition(pPlayer.iGetPosX(), pPlayer.iGetPosY());
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write("^");
        }

        // Draw the entire Fleet
        private void vDrawFleet()
        {
            for (int row = 0; row < fFleet.iGetRows(); row ++)
            {
                for (int column = 0; column < fFleet.iGetColumns(); column++)
                {
                    // Check if there is an enemy to draw
                    if (fFleet.aGetFleetMap()[row, column] != null)
                    {
                        Console.SetCursorPosition(fFleet.aGetFleetMap()[row, column].iGetPosX(), fFleet.aGetFleetMap()[row, column].iGetPosY());
                        // This Switch change the color looking at Row
                        switch (fFleet.aGetFleetMap()[row, column].eGetColor())
                        {
                            case Color.Blue:
                                Console.ForegroundColor = ConsoleColor.Blue;
                                break;
                            case Color.Red:
                                Console.ForegroundColor = ConsoleColor.Red;
                                break;
                            case Color.Yellow:
                                Console.ForegroundColor = ConsoleColor.Yellow;
                                break;
                            case Color.Green:
                                Console.ForegroundColor = ConsoleColor.Green;
                                break;
                            case Color.Magenta:
                                Console.ForegroundColor = ConsoleColor.Magenta;
                                break;
                        }
                        Console.Write("X");
                    }
                }
            }
        }

        // Makes the fleet move
        private void vMoveFleet(Object source, ElapsedEventArgs e)
        {
            fFleet.vMove();
        }

        private void vDrawBullets()
        {
            // Check if there are any bullets to draw
            if (lbBullets.Count > 0)
            {
                // Loops over the bullets list
                for (int i = 0; i < lbBullets.Count; i++)
                {
                    // Check that the bullet to draw actually exists
                    if (lbBullets[i] != null)
                    {
                        Console.SetCursorPosition(lbBullets[i].iGetPosX(), lbBullets[i].iGetPosY());
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.Write("|");
                    }
                }
            }
        }

        // Checks and handles the user input
        private void vCheckPlayerInput()
        {
            if(Console.KeyAvailable) // Checks if the user is pressing a key
            {
                ConsoleKeyInfo keyPressed;
                keyPressed = Console.ReadKey(true);
                // Handles which key was pressed if any
                switch (keyPressed.Key)
                {
                    case ConsoleKey.LeftArrow: // Players wants to go left
                        pPlayer.vMove(Direction.Left);
                        break;
                    case ConsoleKey.RightArrow: // Players wants to go right
                        pPlayer.vMove(Direction.Right);
                        break;
                    case ConsoleKey.Spacebar: // Players wants to shoot
                        if (pPlayer.bIsAbleToShoot())
                        {
                            lbBullets.Add(pPlayer.bShoot());
                        }
                        break;
                    default:
                        break;
                }
            }            
        }

        // Updates the bullets positions
        private void updateBulletsPosition(Object source, ElapsedEventArgs e)
        {
            // Check if there are any bullets to update
            if (lbBullets.Count > 0)
            {
                // Loops over the bullets list to move them
                for (int i = 0; i < lbBullets.Count; i++)
                {
                    if (lbBullets[i] != null)
                    {
                        lbBullets[i].vMove();
                    }
                }
                // Removes bullets from the array so that they get destroyed in case of:
                // Moving out of board or collisioning
                for (int i = 0; i < lbBullets.Count; i++)
                {
                    if (lbBullets[i] != null)
                    {
                        Bullet bCurrentBullet = lbBullets[i];
                        // Check if bullets collide with player
                        if (bCurrentBullet.eGetShooter() == GameObjectType.Enemy && bCurrentBullet.iGetPosY() == pPlayer.iGetPosY())
                        {
                            if (bCurrentBullet.iGetPosX() == pPlayer.iGetPosX())
                            {
                                // Enemy hit the player!!!
                                pPlayer.vDecreaseLife();
                                lbBullets.RemoveAt(i);
                            }
                        }
                        // Checks if the bullet collides with enemies
                        else if (bCurrentBullet.eGetShooter() == GameObjectType.Player && bCurrentBullet.iGetPosY() <= (fFleet.iGetPosY() + fFleet.iGetBottomLimit()) && bCurrentBullet.iGetPosY() >= fFleet.iGetPosY())
                        {
                            // Looping every enemy in the fleet map to check collision
                            for (int row = 0; row < fFleet.iGetRows(); row++)
                            {
                                for (int column = 0; column < fFleet.iGetColumns(); column++)
                                {
                                    if (
                                        fFleet.aGetFleetMap()[row, column] != null &&                                   // Actually we have a ship in the coordinate
                                        bCurrentBullet.iGetPosX() == fFleet.aGetFleetMap()[row, column].iGetPosX() &&   // Check coord X
                                        bCurrentBullet.iGetPosY() == fFleet.aGetFleetMap()[row, column].iGetPosY()      // Check coord Y
                                       )
                                    {
                                        // We have a hit
                                        // Get the points of the destroyed enemy added to the score of the player
                                        pPlayer.vIncreaseScore(fFleet.aGetFleetMap()[row, column].iGetPoints());
                                        // Kill the enemy
                                        fFleet.aGetFleetMap()[row, column] = null;
                                        fFleet.vDecreaseRemainingEnemies();
                                        // Update Available Enemy Columns That Can Shoot
                                        fFleet.vUpdateShootingColumns(column);
                                        // Update Fleet Limits
                                        fFleet.vCalculateFleetLimits();
                                        // Destroy Bullet
                                        lbBullets.RemoveAt(i);
                                        pPlayer.vReloadBullet();
                                        // Increase the speed of the fleet
                                        tFleetMovementTimer.Stop();
                                        tFleetMovementTimer.Interval = fFleet.iGetSpeed() + (fFleet.iGetRemainingEnemies() - 50 * 3);
                                        tFleetMovementTimer.Start();
                                        break;
                                    }
                                }
                            }
                        }
                        // Checks if the bullets get out of the boundaries
                        else if (!bCurrentBullet.bIsInsideBoundaries())
                        {
                            // We know this bullet was spawned by the player
                            if (bCurrentBullet.eGetShooter() == GameObjectType.Player)
                            {
                                pPlayer.vReloadBullet();
                            }
                            // Destroy bullet
                            lbBullets.RemoveAt(i);
                        }
                    }
                }
            }
        }

        // Makes an enemy shoot
        private void makeEnemyShoot(Object source, ElapsedEventArgs e)
        {
            // Check if there are any columns inside the fleet that can shoot
            if(fFleet.getShootingColumns().Count > 0)
            {
                // Create random number between 0 and length of available columns
                Random randomGenerator = new Random();
                int RandomColumn = randomGenerator.Next(0, fFleet.getShootingColumns().Count); 
                // Looping from front to back enemy rows
                for(int row = fFleet.iGetRows() - 1; row >= 0; row--)
                {
                    // Make sure there is an enemy in that position
                    if(fFleet.aGetFleetMap()[row, fFleet.getShootingColumns()[RandomColumn]] != null)
                    {
                        // Enemy shoot
                        Bullet newEnemyBullet = fFleet.aGetFleetMap()[row, fFleet.getShootingColumns()[RandomColumn]].bShoot();
                        lbBullets.Add(newEnemyBullet);
                        break;
                    }
                }
            }
        }

        // Check every game over state to finish game
        public bool bIsGameOver()
        {
            // The player lost all his lifes
            // The Fleet when down enough of the screen
            if (pPlayer.iGetLifes() == 0 || fFleet.iGetPosY() + fFleet.iGetBottomLimit() == pPlayer.iGetPosY())  
            {
                return true;
            }
            // When player kills every enemy, create new fleet
            else if (fFleet.iGetRemainingEnemies() == 0)
            {
                // Create the new Fleet
                fFleet = new Fleet();
                // Increase the speed of the fleet (level)
                if(iLevel <= 60)
                {
                    iLevel += 10;
                }
                tFleetMovementTimer.Stop();
                tFleetMovementTimer.Interval = fFleet.iGetSpeed() - iLevel;
                tFleetMovementTimer.Start();
                return false;
            }
            else
            {
                return false;
            }
        }
    }
}
