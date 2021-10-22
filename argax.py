import twitter
import string 
import random

auth = twitter.OAuth(consumer_key="OgWhn70TrTx6ES1Vc983Sdxfl",
consumer_secret="5UqI73WOfIlWrBSA0g7JMxQT7SG0o4QJYxsWj2k655fqWfNeSp",
token="1435821339508674561-yJ2HeKuGBChkLib7CFaIPEL3ajOlpw",
token_secret="mJAOUEiHbkg32KWOvdc4j1OaEPdYWk50cXlmWehkPMwAA")

t = twitter.Twitter(auth=auth)

chars = string.ascii_lowercase

num = random.randint(1,10)
status = ''.join([random.choice(chars) for i in range(num)])

t.statuses.update(status=status) 

