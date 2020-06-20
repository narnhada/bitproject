package com.springbootdatabase.controller;

import com.springbootdatabase.model.MemberModel;
import com.springbootdatabase.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MemberController {
    
    @Autowired
    MemberService memberService;
    @RequestMapping("/")
    public String aaa(Model model)
    {
        System.out.println("x");
        
        return "list";
    }

    @RequestMapping("/list")
    public String list(Model model)
    {
        List<MemberModel> member = memberService.printMember();
        model.addAttribute("memberList",member);
        return "list";
    }

//    @RequestMapping("/list")
//    public List list(Model model)
//    {
//        List<MemberModel> member = memberService.printMember();
//        model.addAttribute("memberList",member);
//        return member;
//    }

    @RequestMapping("/addMember")//GET방식
    public String addMember(Model model)
    {
        return "addMember";
    }

    @RequestMapping(value="/insert", method= RequestMethod.POST)
    public String insert(@RequestBody final HashMap<String,Object> post, HttpServletRequest request) throws UnsupportedEncodingException{
        request.setCharacterEncoding("UTF-8");
        MemberModel member = new MemberModel();
        member.setId(post.get("id").toString());
        member.setName(post.get("name").toString());
        member.setPassword(post.get("pw").toString());
        member.setAge(Integer.parseInt(post.get("age").toString()));

        memberService.insertMember(member);
//        ModelAndView result = new ModelAndView("redirect:/list");
        //굳이 ModelAndView객체를 사용한 이유는 말그대로 Model객체와 view에 넘겨줄 페이지값을 가진 return값을 합친것이다.얘를 사용하면 실행할 페이지이름을 지정해주거나 생성시 페이지의 이름 생성가능
        return "회원가입 완료"; //controller에서 할꺼 다 하고 view에 던져줄것.
    }

    @RequestMapping(value="/delete", method=RequestMethod.POST)
    public String delete(HttpServletRequest request) throws UnsupportedEncodingException{

        request.setCharacterEncoding("UTF-8");
        MemberModel member = new MemberModel();//새로운 모델객체를 생성한뒤
        member.setId((request.getParameter("id")));//POST방식으로 넘어온 정보들을 이 새로 생성된 객체안에 넣어주고
        member.setPassword((String)request.getParameter("password"));
        memberService.deleteMember(member);//그정보를 삭제해줌.->결국 쿼리문을 가르키고 있다.
        return "redirect:/list";
    }

    @RequestMapping("/updateMember")//여긴 jsp에서 받아오는 GET방식
    public String updateMember(Model model,HttpServletRequest request )
    {
        model.addAttribute("id",request.getParameter("id"));//처음 list에서 update되면서 넘겨줄때 id를 넘겨주기 위해서 add를 하여 추가해준다.jsp는 model을 사용하기 때문에
        return "updateMember";
    }

    @RequestMapping(value="/update", method=RequestMethod.POST)//jsp에서 사용되는 POST방식
    public String update(HttpServletRequest request) throws UnsupportedEncodingException{

        request.setCharacterEncoding("UTF-8");
        MemberModel member = new MemberModel();
        member.setId((request.getParameter("id")));
        member.setName((String)request.getParameter("name"));
        member.setPassword((String)request.getParameter("password"));
        member.setAge(Integer.parseInt(request.getParameter("age")));
        memberService.updateMember(member);

        return "redirect:/list";
    }

    @RequestMapping(value="/login" , method=RequestMethod.POST)
    public String login(@RequestBody final HashMap<String,Object> post ,HttpServletRequest request) throws  UnsupportedEncodingException
    {
        request.setCharacterEncoding("UTF-8");
        MemberModel member = new MemberModel();
        request.getSession().setAttribute("id",post.get("id").toString());//id를 잠시 보관해두기 위한 단계
        member.setId(post.get("id").toString());
        member.setPassword(post.get("pw").toString());
        System.out.println(post.get("id").toString());
        boolean result = memberService.loginMember(member);
        if(result)
        {
            return "su";//로그인 성공
        }
        return "re"; //로그인 실패
    }

    

    @RequestMapping(value="/checkId",method=RequestMethod.POST)
    public String checkId(@RequestBody final HashMap<String,Object> post, HttpServletRequest request) throws Exception{
        request.setCharacterEncoding("UTF-8");
        MemberModel member = new MemberModel();
        System.out.println(post.get("id").toString());
        member.setId(post.get("id").toString());
        boolean result = memberService.checkId(member);
        if(result)
        {
            return "중복 안됨"; //중복 안된경우
        }
        else
        {
            return "중복임"; //중복인경우
        }

    }
    @RequestMapping(value="/image",method=RequestMethod.POST)
    public String img( HttpServletRequest request) throws Exception{
        Process proc=null;
        String str =null;
        try{
            List<String> cmd1 = new ArrayList<String>();
            cmd1.add("cmd");
            cmd1.add("/c");
            cmd1.add(" C:/react/re-st/demo1/src/main/python/Project_test/test1.py");
            
            //cmd1.add("python test2.py");
            proc = new ProcessBuilder(cmd1).start();
            BufferedReader std = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            while((str = std.readLine())!=null){
                System.out.println(str);
                System.out.println("줄바꿈");
            }
        }catch(Exception e){
            System.out.println(e);

        }finally{
            System.out.println("fa");
        }


        return "ra";

    }
    @ResponseBody
    @RequestMapping(value = "/map", method = RequestMethod.POST)//python파일을 실행시키고, json파일로 넘겨준다.넘겨줄때 반환형 주의할것.
    public String pyclo(@RequestBody HashMap<String,Object> map, HttpServletRequest request) throws Exception{
        request.setCharacterEncoding("UTF-8");


        //파이썬 실행
        String path = "C:\\react\\project\\springbootdatabase\\src\\main\\java\\com\\springbootdatabase\\hellopython\\"; //python 실행 경로
        String py = "test.py";
        try{

            String a=path+py;
            String cmdArray =  "cmd /c python "+a + " " +map.get("gu")+" "+ map.get("dong");
            //실행할 프로그램과 전달할 인수를 문자열 배열로
            System.out.println(cmdArray);

            Runtime rt = Runtime.getRuntime();
            Process proc = rt.exec(cmdArray); //시스템 명령어

            InputStream is = proc.getInputStream();
            InputStreamReader isr = new InputStreamReader(is,"euc-kr");
            BufferedReader br = new BufferedReader(isr);

            String line;
            while((line=br.readLine())!= null){
                System.out.println(line);
            }
        }catch(final Exception e){ System.out.println(e); }finally{
            
        }

        HashMap<String,Object> hashMap = new HashMap<String,Object>();

        hashMap.put("image1","C:\\Users\\user\\IdeaProjects\\bitproject-master\\springbootdatabase\\image1.png");
        hashMap.put("image2","C:\\Users\\user\\IdeaProjects\\bitproject-master\\springbootdatabase\\image2.png");
        

        //return으로 구에 맞는 json파일 ,맞는 image파일, json을 만들어서 보내려면 JsonObject를 생성해서 보내줄것.(return값은 String)
        return "http://localhost:8080/graph/image2.png";
    }
    @ResponseBody
    @RequestMapping(value = "/graph", method = RequestMethod.POST)//python파일을 실행시키고, json파일로 넘겨준다.넘겨줄때 반환형 주의할것.
    public String graph(@RequestBody HashMap<String,Object> map, HttpServletRequest request) throws Exception{
        
        return null;
    }
}
