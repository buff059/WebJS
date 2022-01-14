#! /usr/bin/python

from bs4 import BeautifulSoup

with open('datafromrequest.txt', 'r') as rf:
	s = rf.read()

soup = BeautifulSoup(s, "html.parser")
titles = soup.findAll('td')
print(titles)

l = []
for link in titles:
	a = link.find('a')
	if a is not None and 'href' in a.attrs:
		l.append(str(a.get('href')))
print(l)

dataList = [] 
for data in l:
	dataList.append(data[14:23])
print(dataList);

with open('data.txt', 'w') as wf:
	for data in dataList:
		wf.writelines(data + '\n')

