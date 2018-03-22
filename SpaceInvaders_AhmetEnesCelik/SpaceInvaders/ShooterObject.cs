using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceInvaders
{
    abstract class ShooterObject : GameObject
    {
        // Shoots a bullet
        public Bullet bCreateBullet()
        {
            return new Bullet(eType, iPosX, iPosY);
        }
    }
}
