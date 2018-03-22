using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class GameUI : MonoBehaviour
{
	[SerializeField]
	private Text _FrogCount;

	void Awake()
	{
		Frog.Count = 0;
	}

	void Update()
	{
		_FrogCount.text = "Frogs: "+ Frog.Count;

		if(Frog.Count <= 0)
		{
			SceneManager.LoadScene("MainMenuScene");
		}
	}

}