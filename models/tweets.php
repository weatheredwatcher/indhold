<?php

class Tweets CI_Model {
	
	public $id;
	public $tweet;
	public $username;
	public $screenname;
	public $hashtags;
	public $image;
	
	
    public function __construct()
           {
                   // Call the CI_Model constructor
                   parent::__construct();
           }


		   
		   public function getTweets()
		   {
		   	
			   $this->db->order_by('id', 'desc');
			   $query = $this->db->get('tweets');
			   return $query->result_array();
			
		   }
		   
		   public function getScores($team)
		   {
		   	
			   if($team =="yellow") { $team = 'yl'; } 
			   if($team =="blue") { $team = 'bl'; } 
			   if($team =="green") { $team = 'gr'; } 
			   if($team =="teal") { $team = 'TL'; } 
			   if($team =="purple") { $team = 'PL'; } 
			   
			   
			   error_log('TEAM from TWEET MODEL: ' . $team);
			   	$query = $this->db->query("SELECT COUNT(*) as c FROM tweets where hashtags like '%$team%'");
		
			   return $query->result_array();
		   }

	
	
}