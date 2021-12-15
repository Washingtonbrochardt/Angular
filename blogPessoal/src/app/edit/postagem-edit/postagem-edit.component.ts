import { TemaService } from './../../service/tema.service';
import { Tema } from './../../model/Tema';
import { environment } from './../../../environments/environment.prod';
import { PostagemService } from './../../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from './../../model/Postagem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem:Postagem = new Postagem()

  tema:Tema=new Tema()
  listaTemas:Tema[]
  idTema:number

  constructor(
    private postagemService : PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    
    window.scroll(0,0)

    if(environment.token == ''){
      // alert("Sua seção expirou, faça o login novamente.")
      this.router.navigate(['/login'])
    }
    let id = this.route.snapshot.params["id"]
    
    this.findByIdPostagem(id)
    this.findAllTemas()

  }

  findByIdPostagem(id:number){
    this.postagemService.getByIdPostagem(id).subscribe((resp:Postagem) =>{
      this.postagem=resp
    })

  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema=resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp:Tema[])=>{
      this.listaTemas=resp
    })
  }

  atualizar(){
    this.tema.id= this.idTema
    this.postagem.tema=this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp : Postagem)=>{
      this.postagem = resp
      alert("Postagem atualizado com sucesso!")
      this.router.navigate(["/inicio"])
    })
  }

}
