using UnityEngine;

public class LifeSpan : MonoBehaviour
{

	[SerializeField]
	private float _LifeSpan = 5;

	void Start()
	{
		Destroy(gameObject, _LifeSpan);
	}
	
}
