package com.example.ssg1

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnLogin.setOnClickListener {
            startActivity(Intent(this,MainActivity2::class.java))
            edtID.setText("")
            edtPwd.setText("")
            overridePendingTransition(R.anim.fadein,R.anim.fadeout)
        }
    }
}