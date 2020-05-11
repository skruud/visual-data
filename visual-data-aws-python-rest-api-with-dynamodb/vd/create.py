import json
import logging
import os
import time
import http.client

import boto3
dynamodb = boto3.resource('dynamodb')

def create(event2, context):
    baseUrl = "/api/search?vertical=job&subvertical=fulltime&extension=&filters=&location=0.20001"
    urlList = [
        "",
        "&location=1.20001.22042",
        "&location=1.20001.22034",
        "&location=1.20001.20015",
        "&location=1.20001.20018",
        "&location=1.20001.20061",
        "&location=1.20001.20012",
        "&location=1.20001.22054",
        "&location=1.20001.20016",
        "&location=1.20001.22038",
        "&location=1.20001.22046",
        "&location=1.20001.22030"
        ]
    
    ts = time.gmtime()
    timestamp = time.strftime("%Y-%m-%d-", ts)
    
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
    
    for location in urlList:
        connection = http.client.HTTPSConnection("www.finn.no")
        connection.request("GET", baseUrl+location)
        response = connection.getresponse()
        
        
        #print(response.read().decode('utf-8') )
        event = json.loads( response.read().decode('utf-8')  )
        connection.close()
        
        
        
        #data = json.loads(event)
        
        
        
        occupations = event['filterWidgets'][2]['root']['children']
        occupationDict = {}
        for i in range(0, len(occupations)):
            occupationDict.update( {occupations[i]['label']: int(occupations[i]['hitCount'])} )
        
        industries = event['filterWidgets'][3]['root']['children']
        industryDict = {}
        for i in range(0, len(industries)):
            industryDict.update( {industries[i]['label']: int(industries[i]['hitCount'].replace(u'\xa0', "") )} )
            
        durations = event['filterWidgets'][6]['root']['children']
        durationDict = {}
        for i in range(0, len(durations)):
            durationDict.update( {durations[i]['label']: int( durations[i]['hitCount'].replace(u'\xa0', "") )} )
            
        forms = event['filterWidgets'][7]['root']['children']
        formDict = {}
        for i in range(0, len(forms)):
            formDict.update( {forms[i]['label']: int( forms[i]['hitCount'].replace(u'\xa0', "") )} )
            
        sectors = event['filterWidgets'][8]['root']['children']
        sectorDict = {}
        for i in range(0, len(sectors)):
            sectorDict.update( {sectors[i]['label']: int( sectors[i]['hitCount'].replace(u'\xa0', "") )} )
            
        roles = event['filterWidgets'][9]['root']['children']
        roleDict = {}
        for i in range(0, len(roles)):
            roleDict.update( {roles[i]['label']: int(roles[i]['hitCount'])} )
        
        
        item = {
            'date': timestamp+event['filterWidgets'][5]['summary'],
            'location': event['filterWidgets'][5]['summary'],
            'totalPositions': event['objectCount'],
            'totalAds': event['hits'],
            'occupation': occupationDict,
            'industry': industryDict,
            'duration': durationDict,
            'form': formDict,
            'sector': sectorDict,
            'role': roleDict,
            
        }
    
        # write the todo to the database
        table.put_item(Item=item)

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
          'Access-Control-Allow-Origin': '*'
        },
        "body": json.dumps(item)
    }

    return response
