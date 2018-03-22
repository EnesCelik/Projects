using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{

    [SerializeField]
    private Projectile _ProjectilePrefab;
    bool switchWeapon = true;

    // Weapons Properties
    private int count = 0;
    private bool overHeated = false;
    private float overheatTıme = 0.0f;

    public Camera NormalCam;
 
    public Camera LaserCam;

    void Start()
    {
        //StartCoroutine(Example());
        NormalCam.gameObject.SetActive(true);
        LaserCam.gameObject.SetActive(false);
    }
  
	void Update()
	{
		Cursor.lockState = CursorLockMode.Locked;

		float mouseX = Input.GetAxis("Mouse X");
		float mouseY = Input.GetAxis("Mouse Y");

		transform.Rotate(0, mouseX, 0, Space.World);
		transform.Rotate(-mouseY, 0, 0);

        if (Input.GetKeyDown(KeyCode.Space))
        {
            if (switchWeapon)
            {
               // _ProjectilePrefab._ShootForce = 30000;
                NormalCam.gameObject.SetActive(true);
                LaserCam.gameObject.SetActive(false);
            }
            else
            {
               // _ProjectilePrefab._ShootForce = 300000;
                NormalCam.gameObject.SetActive(false);
                LaserCam.gameObject.SetActive(true);
              
            }
            switchWeapon = !switchWeapon;

        }//when I press LMB

		if(Input.GetMouseButtonDown(0))
        {
            if (count == 0)
            {
                overheatTıme = Time.time;
            }

            if(!overHeated && count < 3)
            {
                Instantiate(_ProjectilePrefab, transform.position, transform.rotation);
                overHeated = ++count > 2;
            }
        }

        // Weapon cool down
       if (overHeated)
       {
            if(Time.time - overheatTıme > 2)
            {
                overHeated = false;
                count = 0;
            }
       }
       else
       {
            if(Time.time - overheatTıme > 2)
            {
                count = 0;
            }
       }
    }

}
