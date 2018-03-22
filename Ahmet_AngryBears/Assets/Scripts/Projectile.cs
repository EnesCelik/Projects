using UnityEngine;

public class Projectile : MonoBehaviour
{
    [SerializeField]
    public float _ShootForce = 30000;



    void Start()
	{
       
        GetComponentInChildren<Rigidbody>().AddForce(transform.forward * _ShootForce);
     
    }


}
