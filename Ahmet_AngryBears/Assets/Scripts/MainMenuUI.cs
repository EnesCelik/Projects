using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenuUI : MonoBehaviour
{

	void Start()
	{
		Cursor.lockState = CursorLockMode.None;
	}

	public void OnPressedStartGame()
	{
		SceneManager.LoadScene("GameScene");
	}
	
}
