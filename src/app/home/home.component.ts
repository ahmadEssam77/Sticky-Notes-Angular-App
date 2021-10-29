import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myMessage: string = "";
  // hideDiv: boolean = false;
  myArray: any[] = [];
  userCitizenId: any = jwtDecode(JSON.stringify(localStorage.getItem('userToken')));
  userToken: any = localStorage.getItem('userToken');

  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  // ADD

  addNotesFormGroup = new FormGroup({
    title: new FormControl(null),
    desc: new FormControl(null)
  })

  addNotes(formNoteData: FormGroup) {
    // console.log(this.userCitizenId._id);
    let myNotesObject: any = {
      "title": formNoteData.value.title,
      "desc": formNoteData.value.desc,
      "citizenID": this.userCitizenId._id,
      "token": this.userToken
    }

    this._AuthService.notesToAPI(myNotesObject).subscribe((response)=> {
      if(response.message == "success") {
        this.getNotes();
        formNoteData.reset();
        // console.log(myNotesObject);
      }
      else {
        console.log("Issue in addNotes function");
      }
    })
  }

  // GET

  getNotes() {
    let getNotesObject = {
      "token" : this.userToken,
      "userID" : this.userCitizenId._id
    }

    this._AuthService.getNotesFromAPI(getNotesObject).subscribe((response)=> {
      if(response.message == "success") {
        // console.log(response.message);
        this.myArray = response.Notes;
        // console.log(this.myArray[0].title);
        // console.log(this.myArray[0].desc);
      }
      else {
        console.log("Issue in getNotes function");
      }
    })
  }

  // DELETE
  deleteNotes() {
    let deleteNotesObject = {
      "NoteID": "",  // Get NoteID
      "token": this.userToken
    }

    this._AuthService.deleteNotesFromAPI(deleteNotesObject).subscribe((response)=> {
      console.log(response);
      if (response.message == "deleted") {
        this.getNotes();
      }
      else {
        console.log("Issue in delete function");
      }
    })
  }

}

