<?php

/**
* Custom Traits
*
*/

//Points Traits

//Auth Traits
namespace CustomTraits;

trait ApplicationVersion {

    public static function get()
    {
        $commitHash = trim(exec('git log --pretty="%h" -n1 HEAD'));

        $commitDate = new \DateTime(trim(exec('git log -n1 --pretty=%ci HEAD')));
        $commitDate->setTimezone(new \DateTimeZone('UTC'));

        return sprintf('%s (%s)', $commitHash, $commitDate->format('Y-m-d H:m:s'));
    }
}

trait Options {


    public static function store($option, $value)
    {
        $sql="INSERT INTO admin (option, value) values( ?, ?)";
        $value=$app['dbs']['points']->fetchArray($sql);
    }
    public static function get($option)
    {

        $sql="SELECT value from admin WHERE option=$option";
        $value=$app['dbs']['points']->fetchArray($sql);

    }



}

// Usage: echo 'MyApplication ' . ApplicationVersion::get();

// MyApplication v1.2.3-dev.474a1d0 (2016-11-02 14:11:22)
