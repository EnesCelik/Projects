using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// This enables the meshrenderer a frame later than usual, to avoid a glitch that showed when the teddy was instantiated
/// </summary>
public class ModelEnabler : MonoBehaviour
{

    // Use this for initialization
    IEnumerator Start()
    {
        GetComponent<Renderer>().enabled = false;
        yield return null;
        GetComponent<Renderer>().enabled = true;

    }
}
