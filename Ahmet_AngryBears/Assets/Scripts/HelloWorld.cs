using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HelloWorld : MonoBehaviour
{

	//Runs before Start
	void Awake()
	{
		print("Awake");
	}

	// Use this for initialization
	void Start ()
	{
		print("Hello World!");
	}
	
	void OnEnable()
	{
		print("OnEnable");
	}

	// Update is called once per frame
	void Update (){}

	//After Update, every frame
	void LateUpdate(){}

	//Called 50 times a second (Normal Settings)
	void FixedUpdate(){}
}
