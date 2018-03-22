using UnityEngine;

public class Frog : MonoBehaviour
{
	public static int Count;

	[SerializeField]
	private float _VelocityToDie = 10f;

	[SerializeField]
	private AudioSource _FrogDieSound;

	void Start()
	{
		++Count;
	}

	void OnCollisionEnter(Collision other)
	{
		if(other.relativeVelocity.magnitude >= _VelocityToDie)
		{
			Destroy(gameObject);
			Instantiate(_FrogDieSound, transform.position, transform.rotation);
		}
	}

	void OnDestroy()
	{
		--Count;
	}

}
